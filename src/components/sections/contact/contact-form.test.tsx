import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contact } from "@/content/contact";

// env is read in one module; mock it so each test controls the endpoint.
const envMock = vi.hoisted(() => ({
  env: {
    formEndpoint: "https://forms.test/f/abc" as string | undefined,
    formAccessKey: undefined,
    siteUrl: "http://x",
  },
}));
vi.mock("@/lib/env", () => envMock);

import { ContactForm } from "./contact-form";

const fill = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText(/^Name/), "Ada");
  await user.type(screen.getByLabelText(/^Email/), "ada@company.com");
  await user.selectOptions(screen.getByLabelText(/^Project type/), "Web application");
  await user.type(screen.getByLabelText(/^Message/), "We need a customer portal.");
};

describe("ContactForm", () => {
  beforeEach(() => {
    envMock.env.formEndpoint = "https://forms.test/f/abc";
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows inline errors and a focused error summary when invalid", async () => {
    const user = userEvent.setup();
    render(<ContactForm content={contact} email="a@b.co" />);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    const summary = await screen.findByRole("alert");
    expect(summary).toHaveTextContent(contact.errors.summaryTitle);
    await waitFor(() => expect(summary).toHaveFocus());
    expect(screen.getByLabelText(/^Name/)).toHaveAttribute("aria-invalid", "true");
  });

  it("shows loading, then success, and posts JSON to the endpoint", async () => {
    let resolve!: (r: Response) => void;
    const fetchMock = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm content={contact} email="a@b.co" />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));

    expect(await screen.findByRole("button", { name: contact.form.sending })).toBeDisabled();
    resolve(new Response("{}", { status: 200 }));
    expect(await screen.findByText(contact.status.successTitle)).toBeInTheDocument();

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://forms.test/f/abc");
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: "Ada",
      email: "ada@company.com",
    });
  });

  it("shows an error state and allows retry when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 500 })));
    const user = userEvent.setup();
    render(<ContactForm content={contact} email="a@b.co" />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    expect(await screen.findByText(contact.status.errorTitle)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: contact.status.retry })).toBeEnabled();
    expect(screen.getByLabelText(/^Name/)).toHaveValue("Ada"); // input is kept for retry
  });

  it("does not send anything when the honeypot is filled (bot)", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    const { container } = render(<ContactForm content={contact} email="a@b.co" />);
    await fill(user);
    await user.type(container.querySelector<HTMLInputElement>('input[name="website"]')!, "spam");
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    await screen.findByText(contact.status.successTitle);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back to mailto when no endpoint is configured", async () => {
    envMock.env.formEndpoint = undefined;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm content={contact} email="a@b.co" />);
    await fill(user);
    await user.click(screen.getByRole("button", { name: contact.form.submit }));
    expect(await screen.findByText(contact.status.mailtoNote)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
