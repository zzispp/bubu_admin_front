import { toast } from "sonner";
import Logo from "@/components/ui/logo.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { userStore } from "@/stores/user";
import { Link } from "react-router-dom";

const Login = () => {
    const [formState, setFormState] = useState({
        email: "",
        password: ""
    });
    const login = userStore((state) => state.login);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.promise(
            login(formState.email, formState.password),
            {
                loading: '登录中...',
                success: '登录成功',
            }
        );
    };

    return (
        <div className="w-full h-full flex ">
            <div className="flex-1 bg-foreground  hidden lg:flex ">
                <div className="w-full h-full p-14 flex flex-col items-start justify-between">
                    <Logo />
                    <span className="ml-2 text-xl font-bold text-background">PuPu Admin</span>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-8 text-center flex flex-col gap-3">
                    <span className="text-3xl font-bold">登录</span>
                    <span className="text-[15px] text-muted-foreground">在下面输入您的电子邮件以登录账户</span>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="请输入您的邮箱"
                            value={formState.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="请输入您的密码"
                            value={formState.password}
                            onChange={handleInputChange}
                        />
                        <Button type="submit" color="primary" className="w-full">
                            登录
                        </Button>
                    </form>
                    <div className="mt-4">
                        <span className="text-muted-foreground">还没有账号？</span>
                        <Link to="/register" className="text-primary ml-1 hover:underline">
                            点击注册
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
