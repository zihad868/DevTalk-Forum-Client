import Loading from '../../shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Search = () => {
  const axiosPublic = useAxiosPublic();

  const queryParams = new URLSearchParams(window.location.search);
  const queryValue = queryParams.get("query");

  console.log(queryValue)

  const {data} = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
       const res = await axiosPublic.get(`/api/posts?query=${queryValue}`)
       return res.data;
    }
  })

  console.log(data)

  return (
    <div>
      <div></div>
    </div>
  );
};

export default Search;
