import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  EyeIcon,
  EyeOffIcon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
} from "@/components/ui/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hook";
import { login, register } from "@/utils/slices/userSlice";
import { LoginFormField, RegisterFormField } from "@/utils/forms/authForms";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: LoginFormField,
  });
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: RegisterFormField,
  });

  async function onLogin(values) {
    await dispatch(login(values));
  }

  async function onRegister(values) {
    await dispatch(register(values));
    navigate("/chat");
  }

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <Tabs defaultValue="loginForm" className="w-[100] p-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loginForm">Login</TabsTrigger>
            <TabsTrigger value="registerForm">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="loginForm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Login
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLogin)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
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
                onClick={() => setLoginLayout("registerForm")}
              >
                Sign up
              </a>
            </div> */}
          </TabsContent>
          <TabsContent value="registerForm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Create Account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your profile to create your account
              </CardDescription>
            </CardHeader>
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegister)}>
                <CardContent className="space-y-4">
                  <FormField
                    control={registerForm.control}
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
                    control={registerForm.control}
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
                    control={registerForm.control}
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
