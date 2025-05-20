import { OrganizationProfile, OrganizationSwitcher } from "@clerk/clerk-react"
import { SwatchBook } from "lucide-react"
import OrganizationBadge from "./BadgeList"


const OrgProfile = () => {
	return (
		<div className="w-full flex justify-center">
			<OrganizationProfile
				appearance={{
					variables: {
						colorPrimary: '#db073d',
						colorBackground: '#040708',
						colorTextOnPrimaryBackground: '#ffffff',
						borderRadius: '4px',
						colorText: '#eaeaea',
					},
					elements: {
						navbar: {
							background: '#060c0f',
						},
						scrollBox:{
							background: "linear-gradient(to bottom right, #000000, #060c0f)",
						}
					}
				}}
			>
				<OrganizationSwitcher.OrganizationProfilePage
					label="Badge"
					url="custom"
					labelIcon={<SwatchBook />}
				>
					<OrganizationBadge/>
				</OrganizationSwitcher.OrganizationProfilePage>
			</OrganizationProfile>
		</div>
	)
}

export default OrgProfile