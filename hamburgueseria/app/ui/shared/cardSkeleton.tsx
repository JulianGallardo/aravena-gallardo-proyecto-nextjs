
export default function cardSkeleton() {
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="skeleton h-96 w-full bg-gray-300"></div>
            <div className="skeleton h-4 w-28 bg-gray-300"></div>
            <div className="skeleton h-4 w-full bg-gray-300"></div>
            <div className="skeleton h-4 w-full bg-gray-300"></div>
        </div>
    )
}