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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter correct email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const registerFormSchema = z.object({
  email: z.string().email({
    message: "Please enter correct email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

export const Auth = () => {
  // const [loginLayout, setLoginLayout] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const login = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const register = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    const response = await apiClient.post(LOGIN_ROUTE, values);
    if (response.data.user) navigate("/chat");
  }

  async function onRegister(values: z.infer<typeof registerFormSchema>) {
    const response = await apiClient.post(REGISTER_ROUTE, values, {
      withCredentials: true,
    });
    console.log(response.data);
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-[100] p-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <Form {...login}>
              <form onSubmit={login.handleSubmit(onLogin)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={login.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="w-full text-left">
                          Email
                        </FormLabel>
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
                        <FormLabel className="w-full text-left">
                          Password
                        </FormLabel>
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
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
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

            {/* <div className="text-center text-sm text-gray-500 mt-4 mb-6">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-primary hover:underline"
                onClick={() => setLoginLayout("register")}
              >
                Sign up
              </a>
            </div> */}
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Create Account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your profile to create your account
              </CardDescription>
            </CardHeader>
            <Form {...register}>
              <form onSubmit={register.handleSubmit(onRegister)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={register.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="w-full text-left">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage className="w-full text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={register.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="w-full text-left">
                          Password
                        </FormLabel>
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
                                {showPassword
                                  ? "Hide password"
                                  : "Show password"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="w-full text-left" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={register.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="w-full text-left">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage className="w-full text-left" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </CardContent>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
