"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { useSession } from "next-auth/react";

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    image: ""
  });

  const activeTab = searchParams.get("tab") || "profile";

  useEffect(() => {
    if (status === "loading") return;
    fetchUserData();
  }, [status, session]);

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("token");
      
      // If no custom token and no NextAuth session, redirect to login
      if (!token && status === "unauthenticated") {
        router.push("/auth/login");
        return;
      }

      const headers: any = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/users", {
        headers: headers
      });
      const data = await res.json();
      
      if (res.ok) {
        setUser(data.data);
        setFormData({
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || "",
          address: data.data.address || "",
          bio: data.data.bio || "",
          image: data.data.image || ""
        });
      } else {
        // Only redirect if completely unauthorized
        if (res.status === 401 && status === "unauthenticated") {
             router.push("/auth/login");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      if (status !== "loading") {
        setLoading(false);
      }
    }
  }

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      
      if (!token && status === "unauthenticated") {
         router.push("/auth/login");
         return;
      }

      const headers: any = { "Content-Type": "application/json" };
      if (token) {
         headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch("/api/users", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        // Force update user state with new data
        setUser((prev: any) => ({ ...prev, ...data.data }));
        
        // Update form data to match just in case
        setFormData(prev => ({
            ...prev,
            name: data.data.name || prev.name,
            phone: data.data.phone || prev.phone,
            address: data.data.address || prev.address,
            bio: data.data.bio || prev.bio,
            image: data.data.image || prev.image
        }));

        // Update local storage user (always, to sync with Navbar even for session users)
        const storedUser = localStorage.getItem("user");
        let parsedUser = {};
        if (storedUser) {
           parsedUser = JSON.parse(storedUser);
        }
        localStorage.setItem("user", JSON.stringify({ ...parsedUser, ...data.data }));
        
        // Notify other components (Navbar) about the update
        window.dispatchEvent(new Event("user-updated"));

        alert("Profile updated successfully!");
        
        // Refresh data from server to be 100% sure
        fetchUserData();
        
        // Refresh data from server to be 100% sure
        fetchUserData();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
       alert("An error occurred");
    } finally {
      setSaving(false);
    }
  }

  if (loading || status === "loading") {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Sidebar */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 border-4 border-background mb-4 shadow-xl">
                  <AvatarImage src={formData.image || "/placeholder-user.jpg"} />
                  <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                      {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground mb-6">{user.email}</p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-secondary/10 w-full justify-center">
                  <i className="ri-user-star-line text-primary"></i>
                  <span>Member since {new Date(user.createdAt).getFullYear()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Current Details</CardTitle>
                <CardDescription className="text-xs">
                  Update your details in the form to see them here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <i className="ri-user-line"></i>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="text-sm font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <i className="ri-phone-line"></i>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{user.phone || "Not set"}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{user.address || "Not set"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <i className="ri-text"></i>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bio</p>
                    <p className="text-sm font-medium italic">
                      {user.bio ? `"${user.bio}"` : "No bio added"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList className="mb-8 w-full justify-start overflow-x-auto bg-transparent border-b border-border p-0 h-auto rounded-none">
                <TabsTrigger 
                    value="profile" 
                    className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
                    onClick={() => router.push("/profile?tab=profile", { scroll: false })}
                >
                    Profile Settings
                </TabsTrigger>
                <TabsTrigger 
                    value="orders" 
                    className="px-6 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
                    onClick={() => router.push("/profile?tab=orders", { scroll: false })}
                >
                    Order History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={formData.email} 
                            disabled 
                            className="bg-muted opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={formData.phone} 
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Profile Image</Label>
                          <div className="flex gap-2">
                            <Input 
                                id="image" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 5000000) { // 5MB limit
                                            alert("File size should be less than 5MB");
                                            return;
                                        }
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({...formData, image: reader.result as string});
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                             {formData.image && (
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setFormData({...formData, image: ""})}
                                    title="Remove Image"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </Button>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">Recommended: Square image, max 5MB.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={formData.address} 
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="123 Gaming Street, XP City"
                        />
                      </div>

                      <div className="space-y-2">
                         <Label htmlFor="bio">Bio</Label>
                         <Textarea 
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            placeholder="Tell us about yourself..."
                            className="h-32 resize-none"
                         />
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={saving} className="w-full md:w-auto">
                            {saving ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                                    Saving...
                                </span>
                            ) : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                <Card className="border-border/50 bg-card/50">
                    <CardHeader>
                        <CardTitle>Order History</CardTitle>
                        <CardDescription>View your past orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                                <i className="ri-shopping-bag-3-line text-3xl text-primary/50"></i>
                            </div>
                            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                            <p className="text-muted-foreground mb-6 max-w-sm">
                                You haven't placed any orders yet. Start shopping to fill your game libary!
                            </p>
                            <Button onClick={() => router.push("/")} variant="outline">Browse Products</Button>
                        </div>
                    </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
