import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='min-w-full min-h-screen'>
            <div className='flex items-center justify-center mt-20'>
              <HashLoader size={100} color="#36d7b7" />
            </div>
        </div>
    );
};

export default Loading;
