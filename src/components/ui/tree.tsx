import React, { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import useResizeObserver from "use-resize-observer";

interface TreeDataItem {
    id: string;
    code: string;
    name: string;
    description: string;
    sequence: number;
    type: string;
    path: string;
    redirect?: string;
    component: string;
    status: string;
    parent_id: string;
    children?: TreeDataItem[];
    created_at: string;
    updated_at: string;
}

type TreeProps =
    React.HTMLAttributes<HTMLDivElement> &
    {
        data: TreeDataItem[] | TreeDataItem,
        initialSelectedItemId?: string,
        onSelectChange?: (item: TreeDataItem | undefined) => void,
        expandAll?: boolean
    }

const Tree = React.forwardRef<
    HTMLDivElement,
    TreeProps
>(({
    data, initialSelectedItemId, onSelectChange, expandAll,
    className, ...props
}, ref) => {
    const [selectedItemId, setSelectedItemId] = useState<string | undefined>(initialSelectedItemId)
    const [expandedItemIds, setExpandedItemIds] = useState<string[]>([])

    const handleSelectChange = React.useCallback((item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
            onSelectChange(item)
        }
    }, [onSelectChange]);

    const toggleExpand = (itemId: string) => {
        setExpandedItemIds(prev => 
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        )
    }

    const { ref: refRoot, width, height } = useResizeObserver();

    return (
        <div ref={refRoot} className={cn("overflow-hidden", className)}>
            <ScrollArea style={{ width, height }}>
                <div className="relative p-2">
                    <TreeItem
                        data={data}
                        ref={ref}
                        selectedItemId={selectedItemId}
                        handleSelectChange={handleSelectChange}
                        expandedItemIds={expandedItemIds}
                        toggleExpand={toggleExpand}
                        {...props}
                    />
                </div>
            </ScrollArea>
        </div>
    )
})

type TreeItemProps =
    TreeProps &
    {
        selectedItemId?: string,
        handleSelectChange: (item: TreeDataItem | undefined) => void,
        expandedItemIds: string[],
        toggleExpand: (itemId: string) => void
    }

const TreeItem = React.forwardRef<
    HTMLDivElement,
    TreeItemProps
>(({ className, data, selectedItemId, handleSelectChange, expandedItemIds, toggleExpand, ...props }, ref) => {
    return (
        <div ref={ref} role="tree" className={className} {...props}>
            <ul>
                {Array.isArray(data) ? (
                    data.map((item) => (
                        <li key={item.id}>
                            {item.children && item.children.length > 0 ? (
                                <AccordionPrimitive.Root type="multiple" value={expandedItemIds}>
                                    <AccordionPrimitive.Item value={item.id}>
                                        <AccordionTrigger
                                            className={cn(
                                                "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                                                selectedItemId === item.id && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                                            )}
                                            onClick={() => {
                                                handleSelectChange(item);
                                                toggleExpand(item.id);
                                            }}
                                        >
                                            <span className="text-sm truncate">{item.name}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-6">
                                            <TreeItem
                                                data={item.children}
                                                selectedItemId={selectedItemId}
                                                handleSelectChange={handleSelectChange}
                                                expandedItemIds={expandedItemIds}
                                                toggleExpand={toggleExpand}
                                            />
                                        </AccordionContent>
                                    </AccordionPrimitive.Item>
                                </AccordionPrimitive.Root>
                            ) : (
                                <Leaf
                                    item={item}
                                    isSelected={selectedItemId === item.id}
                                    onClick={() => handleSelectChange(item)}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <li>
                        <Leaf
                            item={data}
                            isSelected={selectedItemId === data.id}
                            onClick={() => handleSelectChange(data)}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
})

const Leaf = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        item: TreeDataItem, isSelected?: boolean
    }
>(({ className, item, isSelected, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex items-center py-2 px-2 cursor-pointer \
        hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                className,
                isSelected && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
            )}
            {...props}
        >
            <span className="flex-grow text-sm truncate">{item.name}</span>
        </div>
    );
})

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 w-full items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            className
        )}
        {...props}
    >
        <div className="pb-1 pt-0">{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Tree, type TreeDataItem }
