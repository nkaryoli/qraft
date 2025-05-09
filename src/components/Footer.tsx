import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
    return (
        <div className="w-full flex justify-center pt-20 pb-9 px-6 md:px-9 bg-gradient-to-t from-black to-transparent text-md">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                <p className="text-center md:text-start leading-6">
                    © 2025 Qraft <br /> Developed by{' '}
                    <a href="https://github.com/nkaryoli" className="text-primary">
                        Karyoli Nieves
                    </a>
                </p>
                <div className="flex gap-2 md:gap-6 items-center">
                    {[
                        {
                            href: 'mailto:karyoli.ie@gmail.com',
                            icon: <IoIosMail className="size-8" />,
                        },
                        {
                            href: 'https://www.linkedin.com/in/karyoli-nieves/',
                            icon: <FaLinkedin className="size-6" />,
                        },
                        {
                            href: 'https://github.com/nkaryoli',
                            icon: <SiGithub className="size-6" />,
                        },
                    ].map(({ href, icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="hover:drop-shadow-[2px_2px_2px_rgba(103,232,203,0.7)] transition-transform hover:scale-110"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;
