interface Prop {
    text: string;
    isSelected: boolean;
    onClick: () => void;

}
const NumberBox: React.FC<Prop> = ({ text, isSelected, onClick }) => {
    return (
        <button className='w-full' onClick={onClick}>
            <div className={`h-10 flex justify-center items-center rounded-md border-1 border-[#9ba8b0] ${isSelected ?  "bg-[#2c3439] text-primary-foreground" : "bg-background text-secondary"}`}>
                {text}
            </div>
        </button>
    )
}

export default NumberBox
