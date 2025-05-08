import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const HomePage = () => {
    return (
        <Layout>
            <div className="flex flex-col gap-3">
                <h1>HomePage</h1>
                <Button>Click me</Button>
            </div>
        </Layout>
    );
};

export default HomePage;
