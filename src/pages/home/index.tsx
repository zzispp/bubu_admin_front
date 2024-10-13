import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { logos } from "@/icons/logos";
import { Link } from "react-router-dom";
// Tailwind Grid cell classes lookup
const columnClasses: Record<(typeof logos)[number]["column"], string> = {
  1: "xl:col-start-1",
  2: "xl:col-start-2",
  3: "xl:col-start-3",
  4: "xl:col-start-4",
  5: "xl:col-start-5",
}
const rowClasses: Record<(typeof logos)[number]["row"], string> = {
  1: "xl:row-start-1",
  2: "xl:row-start-2",
  3: "xl:row-start-3",
  4: "xl:row-start-4",
  5: "xl:row-start-5",
  6: "xl:row-start-6",
}

const Home = () => (
    <main className="min-h-full">
        <header className="flex justify-between  container items-center p-4 mx-auto">
            <Logo size={32} />
            <div>
                <Button asChild className="mr-2">
                    <Link to="/login">登录</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link to="/register">注册</Link>
                </Button>
            </div>
        </header>
        <div className="grid place-items-center px-4 py-16 xl:grid-cols-2 xl:gap-24">
            <div className="flex max-w-md flex-col items-center text-center xl:order-2 xl:items-start xl:text-left">
                <Logo size={40} />
                <h1
                    data-heading
                    className="mt-8 animate-slide-top text-2xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards]
             md:text-3xl xl:mt-4 xl:animate-slide-left 
             xl:text-5xl 
             xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
                >
                    BuBu Admin
                </h1>
                <p
                    data-paragraph
                    className="mt-6 animate-slide-top text-xs text-muted-foreground [animation-delay:0.8s] [animation-fill-mode:backwards] xl:mt-8 xl:animate-slide-left xl:text-base xl:leading-8 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
                >
                    测试
                </p>
            </div>
            <ul className="mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
                <TooltipProvider>
                    {logos.map((logo, i) => (
                        <li
                            key={logo.href}
                            className={`${columnClasses[logo.column]} ${rowClasses[logo.row]} animate-roll-reveal [animation-fill-mode:backwards]`}
                            style={{ animationDelay: `${i * 0.07}s` }}
                        >
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={logo.href}
                                        className="grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24"
                                    >
                                        <img src={logo.src} alt={logo.name} />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>{logo.name}</TooltipContent>
                            </Tooltip>
                        </li>
                    ))}
                </TooltipProvider>
            </ul>
        </div>
    </main>
);

export default Home;
