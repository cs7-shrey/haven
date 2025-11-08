import { useAuthContext } from "@/context/AuthContext";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/hooks/auth/useSignup";
import { Button } from "../ui/button";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});
const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
    const { isSigningUp, signup } = useSignup();
	const { closeLoginPopup } = useAuthContext();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const success = await signup(values.name, values.email, values.password);
		if (success) {
			closeLoginPopup();
		}
	}

    return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your name" type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										placeholder="Enter your password"
										type={showPassword ? "text" : "password"}
										{...field}
									/>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</Button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isSigningUp}>
					{isSigningUp ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Signing up...
						</>
					) : (
						"Sign in"
					)}
				</Button>
			</form>
		</Form>
    );
};

export default SignupForm;
