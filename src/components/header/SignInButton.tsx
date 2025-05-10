import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import { Button } from "../ui/button"
import { memo, useEffect, useState } from "react";

const SignInBtn = ({onClick}:{onClick: () => void}) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="ml-4">
			{isClient && (
				<>
					<SignedOut>
						<Button size="lg" onClick={onClick} className="transition-opacity duration-200">
							Sign in
						</Button>
					</SignedOut>
				<SignedIn>
					<div className="relative transition-opacity duration-200">
						<div className="w-10 h-10 flex items-center justify-center">
							{/* Agregamos appearance="user-button" para asegurar consistencia en el estilo
							y afterSignOutUrl para gestionar mejor la redirección después de cerrar sesión*/}
							<UserButton 
								appearance={{
									elements: {
									userButtonAvatarBox: "h-8 w-8"
									}
								}}
								fallback='/'
							/>
						</div>
						{/* Efecto visual separado del componente para mejor rendimiento */}
						<div className="absolute inset-0 rounded-full pointer-events-none 
								hover:drop-shadow-[0px_0px_6px_rgba(219,7,61,0.5)] 
								group-hover:drop-shadow-[0px_0px_10px_rgba(219,7,61,0.7)]
								transition-all duration-300"
						></div>
					</div>
				</SignedIn>
				</>
			)}
		</div>
	)
}

export default memo(SignInBtn);