import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter correct email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Add your login logic here
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <Form {...login}>
          <form onSubmit={login.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={login.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full text-left">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="w-full text-left" />
                  </FormItem>
                )}
              />
              <FormField
                control={login.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-full text-left">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="w-full text-left" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </CardContent>
          </form>
        </Form>

        <div className="text-center text-sm text-gray-500 mt-4 mb-6">
          Don't have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
};
