import IAudio from "../scripts/IAudio"

export default function Audio({ data } : { data: IAudio }) {
    let { title } = data
    title.length > 65 ? title = title.slice(0, 66) + "..." : null
    return (
        <div className="flex items-center w-[568px] h-[32px] bg-[#0f1114] rounded-lg">
            <span className="text-center m-2">{title}</span>
        </div>
    )
}