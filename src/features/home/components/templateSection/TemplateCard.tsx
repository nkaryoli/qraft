import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateCardProps {
	onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({onClick}) => {
	return (
		<Card className="w-auto" onClick={onClick}>
			<CardHeader>
				<CardTitle>Template</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
			</CardContent>
			<CardFooter className="flex justify-between">
			</CardFooter>
		</Card>
	)
};

export default TemplateCard;