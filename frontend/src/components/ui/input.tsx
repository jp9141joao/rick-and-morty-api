import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-2 border-[#bfbfbf] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:border-3 focus:border-[#707070] hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const InputIntegrado = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full border rounded-l-md border-t-2 border-b-2 border-l-2 border-r-1 border-[#bfbfbf] bg-transparent px-3 py-1 xxs5:px-3 xxs5:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
InputIntegrado.displayName = "InputIntegrado";

const InputSenha = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <div className="flex w-full select-none">
      <InputIntegrado
        type={show ? "text" : "password"}
        placeholder={show ? "Abc1234#" : "********"}
        ref={ref} 
        {...props}
      />
      <div className="grid place-items-center items-center text-[#bfbfbf] hover:text-[#707070] h-10 border rounded-r-md rounded-l-none border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-2 py-1 xxs5:px-3 xxs5:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-[#707070] hover:border-r-2 disabled:cursor-not-allowed disabled:opacity-50" onClick={() => setShow(!show)}>
        {show ? <EyeOff className="w-4 lg:w-5 h-auto xxs5:w-auto p-0"/> : <Eye className="w-4 lg:w-5 h-auto xxs5:w-auto p-0" />}
      </div>
    </div>
  );
});
InputSenha.displayName = "InputSenha"; 



export { Input, InputIntegrado, InputSenha};
