import { HStack , Image, Tooltip} from '@chakra-ui/react'
import {youSuck, goldCoin,bronzeCoin,silverCoin,SupremeInsight,AdvancedInsight,Participation,SupremeHoarder,TheCollector,HumbleStart,ChampionSeeker,ExpertSeeker,NoviceSeeker} from '../../assets/medals/index'
import { GET_USER_MEDALS } from '../../graphQL/queries';
import { useQuery } from '@apollo/client';

const Medal = ({medal}) => {

    let thisMedal;

    // cases to set the image. one will be needed for each medal
    switch (medal.title) {
        case 'you Suck!':

        thisMedal = youSuck;
            
            break;
        case 'Bronze coin':

        thisMedal = bronzeCoin;
            
            break;
        case 'Silver coin':

        thisMedal = silverCoin;
            
            break;
        case 'Gold coin':

        thisMedal = goldCoin;
            
            break;
        case 'Supreme Insight Award':

        thisMedal = SupremeInsight;
            
            break;
        case 'Advanced Insight Award':

        thisMedal = AdvancedInsight;
            
            break;
        case 'Participation Medal':

        thisMedal = Participation;
            
            break;
        case 'Supreme Hoarder Medal':

        thisMedal = SupremeHoarder;
            
            break;
        case 'The Collector':

        thisMedal = TheCollector;
            
            break;
        case 'A Humble Start':

        thisMedal = HumbleStart;
            
            break;
        case 'Champion Seeker':

        thisMedal = ChampionSeeker;
            
            break;
        case 'Expert Seeker':

        thisMedal = ExpertSeeker;
            
            break;
        case 'Novice Seeker':

        thisMedal = NoviceSeeker;
            
            break;
    
        default:
            break;
    }


return(
<Tooltip label={medal.description} fontSize='md'>

    <Image
  borderRadius='full'
  boxSize='30px'
  src={thisMedal}
  alt={medal.title}
/>
  </Tooltip>
);

}


const Medals = ({userid}) => {
    const {loading, error, data} = useQuery(GET_USER_MEDALS, {
        variables: {
            id: userid,
        }
    });
    if(loading){console.log(loading); return (<p>loading</p>)}
    if(error){console.log(error); return( <Text>{error}</Text>)}
    console.log(data);


    const medals = [...data.usermedals]

  return (
    <HStack>
        {medals.map((medal) => (
            <Medal key={medal._id} medal={medal} />
        ))}
    </HStack>
  );
};

export default Medals;
