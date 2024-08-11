import { GET_MEDALS, GET_USER_MEDALS } from "../../graphQL/queries";
import { ADD_MEDAL_TO_USER } from "../../graphQL/mutations";
import { useQuery, useMutation } from '@apollo/client';
import Medal from "./Medal";
import { SimpleGrid,Box,Text } from "@chakra-ui/react";


const ShopItems = ({medals, userid, usercoins}) => {
    const [addMedalToUser] = useMutation(ADD_MEDAL_TO_USER);
    

    async function handlePurchase( uID, mID, price) {

        if(usercoins > price) {
            const { data } = await addMedalToUser({
                variables: {
                  userId: uID,
                  medalId: mID
                },
              });
        }

    } 

    return(
        <SimpleGrid columns={[2, 5, 10]} gap={6}>
        {medals.map((medal) => (
            <Box justifyContent='center' key={medal._id} onClick={() => handlePurchase(userid, medal._id, medal.price)}>
            <Medal key={medal?._id || medal.title} medal={medal} />
            <Text>{medal.price}</Text>
        </Box>
        ))}
    </SimpleGrid>
    )
}
const EmptyShop = () => {
    return(
        <Text>No more medals available</Text>
    )
}


const MedalShop = ({userid, usercoins}) => {
    const userMedals  = useQuery(GET_USER_MEDALS, {
        variables: {
            id: userid,
        }
    });
    
    const allMedals = useQuery(GET_MEDALS)
    
    if(userMedals.loading || allMedals.loading){ return (<p>loading</p>)}
    if(userMedals.error || allMedals.error){console.log(userMedals.error || allMedals.error); return( <Text>{userMedals.error || allMedals.error}</Text>)}
    
    const usermedals = [...userMedals.data.usermedals]
    const allmedals = [...allMedals.data.medals]


    

    const notowned = allmedals.filter(item => !usermedals.some(removeItem => removeItem['_id'] === item["_id"]));
            
    const empyarry =[];
    


  return (
      <>
      {notowned !== empyarry ? <ShopItems medals={notowned} userid={userid} usercoins={usercoins}/> : <EmptyShop />}
      </>
        
    
    
  );
};

export default MedalShop;