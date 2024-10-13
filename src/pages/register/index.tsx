import { toast } from "sonner";
import Logo from "@/components/ui/logo.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

const Register = () => {
    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
                loading: '注册中...',
                success: '注册成功',
                error: '注册失败'
            }
        );
    };

    return (
        <div className="w-full h-full flex ">
            <div className="flex-1 bg-foreground hidden lg:flex ">
                <div className="w-full h-full p-14 flex flex-col items-start justify-between">
                    <Logo />
                    <span className="ml-2 text-xl font-bold text-background">PuPu Admin</span>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-8 text-center flex flex-col gap-3">
                    <span className="text-3xl font-bold">注册</span>
                    <span className="text-[15px] text-muted-foreground">在下面输入您的信息以创建新账户</span>
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <Input
                            type="email"
                            placeholder="请输入您的邮箱"
                        />
                        <Input
                            type="password"
                            placeholder="请输入您的密码"
                        />
                        <Input
                            type="password"
                            placeholder="请确认您的密码"
                        />
                        <Button type="submit" color="primary" className="w-full">
                            注册
                        </Button>
                    </form>
                    <div className="mt-4">
                        <span className="text-muted-foreground">已有账号？</span>
                        <Link to="/login" className="text-primary ml-1 hover:underline">
                            点击登录
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
