import { useUser } from "@clerk/clerk-react";
import TemplateCard from "./TemplateCard"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WarningModal from "@/components/WarningModal";

const TemplateSection = () => {
	const { user, isSignedIn } = useUser();
	const navigate = useNavigate();
	const [ openModal, setOpenModal ] = useState<boolean>(false);
	const [ message, setMessage ] = useState<string>('');

	const handleCardClick = (role:string) => {
		if (!isSignedIn) {
			navigate('/dashboard');
		} else if (user && user.unsafeMetadata.role === role) {
			navigate('/onboarding');
		} else if (isSignedIn && user.unsafeMetadata.role !== role) {
			setOpenModal(true);
			setMessage(
				role === 'user' 
					? 'Wait! Log in with you user account first. Do you wish to proced?' 
					: 'You need to create an organization in order to create this type of badge'
			);
		}
		console.log(role);
	}

	return (
		<section className="w-full flex flex-col gap-20 items-center h-96">
            <h1>Create a Template</h1>
			<div className="w-full grid grid-cols-4 gap-6 px-20">
				<TemplateCard onClick={()=> handleCardClick('user')} />
				<TemplateCard onClick={() => handleCardClick('user')} />
				<TemplateCard onClick={() => handleCardClick('user')} />
				<TemplateCard onClick={() => handleCardClick('admin')} />
			</div>
			<WarningModal 
				isOpen={openModal} 
				onClose={() => setOpenModal(false)}
				message={message}
			/>
		</section>
	)
}

export default TemplateSection