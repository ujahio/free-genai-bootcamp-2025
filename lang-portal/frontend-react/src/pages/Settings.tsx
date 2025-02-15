import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { AdminService } from "@/services/admin.service";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const Settings = () => {
	const { theme, setTheme } = useTheme();
	const [isResetting, setIsResetting] = useState(false);
	const queryClient = useQueryClient();

	const handleResetHistory = async () => {
		try {
			setIsResetting(true);
			await AdminService.resetHistory();
			// Invalidate relevant queries
			queryClient.invalidateQueries({ queryKey: ["study-sessions"] });
			queryClient.invalidateQueries({ queryKey: ["study-stats"] });
			queryClient.invalidateQueries({ queryKey: ["last-study-session"] });
			toast.success("Study history has been reset successfully");
		} catch (error) {
			toast.error("Failed to reset study history");
		} finally {
			setIsResetting(false);
		}
	};

	const handleFullReset = async () => {
		try {
			setIsResetting(true);
			await AdminService.fullReset();
			// Invalidate all queries
			queryClient.invalidateQueries();
			toast.success("Database has been reset and reseeded successfully");
		} catch (error) {
			toast.error("Failed to perform full reset");
		} finally {
			setIsResetting(false);
		}
	};

	return (
		<div className="page-container">
			<h1 className="text-3xl font-bold mb-6">Settings</h1>

			<div className="space-y-8">
				{/* Theme Selection */}
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Appearance</h2>
					<div className="flex items-center gap-4">
						<Label htmlFor="theme">Theme</Label>
						<Select value={theme} onValueChange={setTheme}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select theme" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Reset Options */}
				<div className="space-y-4">
					<h2 className="text-xl font-semibold">Reset Options</h2>

					{/* Reset History */}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" disabled={isResetting}>
								Reset History
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Reset Study History</AlertDialogTitle>
								<AlertDialogDescription>
									This will delete all study sessions and word review items.
									This action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleResetHistory}>
									Reset History
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					{/* Full Reset */}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" disabled={isResetting}>
								Full Reset
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Full Database Reset</AlertDialogTitle>
								<AlertDialogDescription>
									This will drop all tables and recreate them with seed data.
									All your study progress and customizations will be lost. This
									action cannot be undone.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleFullReset}>
									Full Reset
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	);
};

export default Settings;
