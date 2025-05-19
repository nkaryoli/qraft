import { Button } from '@/components/ui/button'
import GenerateQRHome from './GenerateQRHome'
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
	const [ showInput, setShowInput ] = useState<boolean>(false);
	
	return (
		<div className="w-full bg-background text-foreground">
			<section className="relative pb-24 pt-44 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/50 to-background space-y-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center">
						<Badge variant="secondary" className="mb-4 text-sm font-medium">
							Revolutionizing Digital Identification
						</Badge>
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
							Create Stunning and Customized <br/><span className="text-primary">QR Codes </span> 
							and <span className="text-primary">Badges</span>
						</h1>
						<p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
							The all-in-one solution for professional digital identification, instant access, and brand consistency.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
							{showInput ? (
								<GenerateQRHome />
							) : (
								<>
									<Button size="lg" onClick={() => setShowInput(true)}>
										Get Started Free
									</Button>
									<Button size="lg" variant="outline" >
										Explore Features
									</Button>
								</>
							)
							}
						</div>
					</div>
				</div>
				<div className="w-full flex justify-center">
				</div>
			</section>
		</div>
	)
}

export default HeroSection