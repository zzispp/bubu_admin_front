

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
            <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
                404
            </span>
            <h2 className="font-heading my-2 text-2xl font-bold">
                页面丢失了
            </h2>
            <p>
                抱歉，您要查找的页面不存在或已被移动。
            </p>
            <div className="mt-8 flex justify-center gap-2">
                <Button onClick={() => navigate(-1)} variant="default" size="lg">
                    返回上一页
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    size="lg"
                >
                    返回首页
                </Button>
            </div>
        </div>
    );
}
