import Image from 'next/image';

const Logo = () => {
    return (
        <div>
            <Image src="/path/to/your/image.png" alt="Logo" width={200} height={100} />
        </div>
    );
};

export default Logo;