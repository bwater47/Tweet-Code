import { HStack , Image, Tooltip} from '@chakra-ui/react'
import {youSuck, goldCoin,bronzeCoin,silverCoin} from '../../assets/medals/index'

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


const Medals = ({usermedals}) => {

    const medals = usermedals;

  return (
    <HStack>
        {medals.map((medal) => (
            <Medal key={medal.id} medal={medal} />
        ))}
    </HStack>
  );
};

export default Medals;
