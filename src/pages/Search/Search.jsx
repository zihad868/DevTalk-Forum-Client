import Loading from '../../shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import PostCard from '../../components/DisplayPosts/PostCard';

const Search = () => {
  const axiosPublic = useAxiosPublic();

  const queryParams = new URLSearchParams(window.location.search);
  const queryValue = queryParams.get("query");

  console.log(queryValue)

  const {data: posts = [], isPending} = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
       const res = await axiosPublic.get(`/api/posts?query=${queryValue}`)
       return res.data;
    }
  })

  if(isPending){
    return <Loading />
  }
  console.log(posts)

  if(posts.length === 0){
    return (
      <>
       <div className='mt-24 text-center text-2xl font-bold'>Search Item not found</div>
      </>
    );
  }

  return (
    <div>
      <div>
        {
          posts.map((post, idx) => <PostCard key={idx} post={post} />)
        }
      </div>
    </div>
  );
};

export default Search;
