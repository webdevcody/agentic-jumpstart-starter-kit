import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "~/lib/auth-client";
import { assertAuthenticatedFn } from "~/fn/guards";
import {
  useUpdateUserProfile,
  useDeleteUserAccount,
} from "~/hooks/useProfile";
import { useUserAvatar } from "~/hooks/useUserAvatar";
import { useSubscriptionManagement } from "~/hooks/useSubscriptions";
import { uploadImageWithPresignedUrl } from "~/utils/storage/helpers";
import { SubscriptionStatus } from "~/components/SubscriptionStatus";
import { PricingSection } from "~/components/PricingSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { User, Trash2, Upload } from "lucide-react";

export const Route = createFileRoute("/account")({
  beforeLoad: () => assertAuthenticatedFn(),
  component: AccountPage,
});

function AccountPage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="container mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile, subscription, and account.
        </p>
      </header>

      {session?.user && <ProfileCard userName={session.user.name ?? ""} />}
      <SubscriptionSection />
      {session?.user && <DangerZone userEmail={session.user.email} />}
    </div>
  );
}

function ProfileCard({ userName }: { userName: string }) {
  const [name, setName] = useState(userName);
  const [isUploading, setIsUploading] = useState(false);
  const { avatarUrl, refetch: refetchAvatar } = useUserAvatar();
  const updateProfile = useUpdateUserProfile();

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const key = `avatars/${crypto.randomUUID()}-${file.name}`;
      const { imageKey } = await uploadImageWithPresignedUrl(key, file);
      await updateProfile.mutateAsync({ data: { image: imageKey } });
      await refetchAvatar();
    } catch (err) {
      toast.error("Avatar upload failed");
      console.error(err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && name !== userName) {
      updateProfile.mutate({ data: { name: name.trim() } });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your name and profile picture.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="bg-primary/10">
              {userName.charAt(0)?.toUpperCase() || <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="avatar-upload" className="cursor-pointer">
              <div className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-accent">
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Change avatar"}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isUploading}
                onChange={onAvatarChange}
              />
            </Label>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={updateProfile.isPending}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                updateProfile.isPending || !name.trim() || name === userName
              }
            >
              {updateProfile.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubscriptionSection() {
  const {
    userPlan,
    handleManageSubscription,
    handleCancelSubscription,
    isLoading,
  } = useSubscriptionManagement();

  const planData = userPlan.data?.success ? userPlan.data.data : null;
  const plan = (planData?.plan ?? "free") as
    | "free"
    | "basic"
    | "pro";

  return (
    <div className="space-y-6">
      <SubscriptionStatus
        plan={plan}
        subscriptionStatus={planData?.subscriptionStatus as never}
        subscriptionExpiresAt={
          planData?.subscriptionExpiresAt
            ? new Date(planData.subscriptionExpiresAt)
            : null
        }
        onManageBilling={handleManageSubscription}
        onCancelSubscription={handleCancelSubscription}
        isLoading={isLoading}
      />
      {plan === "free" && <PricingSection />}
    </div>
  );
}

function DangerZone({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const deleteAccount = useDeleteUserAccount();

  const isConfirmed = confirm.trim().toLowerCase() === userEmail.toLowerCase();

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="text-destructive">Danger zone</CardTitle>
        <CardDescription>
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>
                This permanently deletes your account, profile, and all data
                associated with it. There is no undo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="confirm-delete">
                Type your email{" "}
                <span className="font-mono font-semibold">{userEmail}</span> to
                confirm:
              </Label>
              <Input
                id="confirm-delete"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="off"
                placeholder={userEmail}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={!isConfirmed || deleteAccount.isPending}
                onClick={() =>
                  deleteAccount.mutate({ data: { email: userEmail } })
                }
              >
                {deleteAccount.isPending ? "Deleting..." : "Delete forever"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
