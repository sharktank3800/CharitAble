import { useStore } from "../Store";
import { useEffect } from "react";


function Search(){
    const {searchContents, setState} = useStore();
    useEffect(() => {
        const handleSearch = async () => {
          const slugs = ['dog', 'cat', 'fish', 'health', 'sanctuary', 'hostel']
          const slug = slugs[Math.floor(Math.random()* slugs.length)]
          try {
            const response = await axios.get(`https://partners.every.org/v0.2/search/${slug}?apiKey=pk_live_596302b8ccb639ed7710bd6a962a5f50`, {
              params: {
                q: "dogs",
                limit: 5,
                offset: 0,
                sort: "relevance",
                order: "asc",
                fields: "id,name,description,mission,logo,websiteUrl,category,city,state,zipCode,latitude,longitude,profileImage,profileImageThumbnail"
              }
            });
            setState((oldState)=>{
              return{
               ...oldState,
               searchContents: response.data.nonprofits 
             }
           });
           console.log(response.data.nonprofits);
          } catch (error) {
            console.log(error);
          }
        };
    
        handleSearch();
      }, []);

      return null
}

export {Search}