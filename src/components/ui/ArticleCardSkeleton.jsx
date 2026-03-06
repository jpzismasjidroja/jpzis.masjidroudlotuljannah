import React from 'react';
import { Skeleton } from './Skeleton';

const ArticleCardSkeleton = () => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden flex flex-col h-full min-h-[440px]">
            <Skeleton className="h-64 w-full rounded-none shrink-0" />
            <div className="p-8 text-center flex flex-col grow relative">
                <Skeleton className="absolute -top-6 left-1/2 -translate-x-1/2 h-8 w-24 rounded-b-xl" />
                <Skeleton className="h-4 w-20 mx-auto mt-2 mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                <div className="space-y-2 mb-6 grow">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
                <Skeleton className="h-5 w-32 mx-auto mt-auto" />
            </div>
        </div>
    );
};

export default ArticleCardSkeleton;
