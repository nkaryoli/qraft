import { CreateOrganization } from "@clerk/clerk-react"

const CreateOrg = () => {
	return (
		<div className="w-full flex justify-center items-center h-full">
			<div className="bg-gradient-to-r from-primary/50 via-background to-background p-0.5 rounded-xl">
		
			<CreateOrganization
				afterCreateOrganizationUrl={'/customize'}
				skipInvitationScreen
				appearance={{
					variables: {
						colorPrimary: '#db073d',
						colorBackground: '#040708',
						colorTextOnPrimaryBackground: '#ffffff',
						colorText: '#eaeaea',
					},
					elements: {
						card: {
							background: "linear-gradient(to bottom right, #000000, #060c0f)",
						}
					}
				}}
			/>		
			</div>
		</div>
	)
}

export default CreateOrg;