export default function SidePanel() { 
    return ( 
        <div className="absolute rounded flex flex-col items-center bg-[#0f1114] w-[250px] h-fit left-[50px] p-2 mt-5">
          <span className="text-lg font-bold">Supported Sites</span>
          <ol className="ml-5 list-disc">
            <li>Soundgasm.com</li>
            <li>c#.kemono.su</li>
          </ol>
        </div>
    )
}