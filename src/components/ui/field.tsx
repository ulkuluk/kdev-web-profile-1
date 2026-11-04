import { cn } from "@/lib/cn";

const control =
  "w-full rounded-sm border border-border-strong bg-card px-4 py-3 text-base text-foreground " +
  "placeholder:text-muted-foreground transition-[border-color,box-shadow] " +
  "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 " +
  "aria-[invalid=true]:border-destructive disabled:opacity-60";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (a11y: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => React.ReactNode;
};

/** Label + control + inline error, wired with ids so errors are announced. */
export function Field({ id, label, error, required, className, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive">
            {" "}
            *
          </span>
        )}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: React.ComponentProps<"select">) {
  return <select className={cn(control, "cursor-pointer", className)} {...props} />;
}
