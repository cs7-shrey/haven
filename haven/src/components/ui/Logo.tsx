import "./styles/logo.css"
function LetterDiv({ letter }: { letter: string }) {
    return (
        <div className="font-bold px-1 bg-background text-primary rounded-[2]">{letter}</div>
    );
}
const Logo = () => {
    return (
        <a href={"/"} >
        <div className="text-xl font-bold flex gap-1 items-center">
            <LetterDiv letter="H" />
            <LetterDiv letter="A" />
            <LetterDiv letter="V" />
            <LetterDiv letter="E" />
            <LetterDiv letter="N" />
            {/* HAVEN */}
        </div>
        </a>
    )
}

export default Logo;
