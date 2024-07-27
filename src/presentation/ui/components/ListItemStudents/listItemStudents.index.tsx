import { StudentServerEntity } from "@/@core/domains/server-entities/student.server-entity";
import { convertGender } from "@/@core/utils/convertGender";
import { format } from "date-fns";
import { TouchableOpacity, Image, Text, View } from "react-native";

interface ListItemProps {
    data: StudentServerEntity;
    toggleFn ?: () => void
    setDataSelected?:React.Dispatch<React.SetStateAction<StudentServerEntity | null>>
  }

 const ListItemStudents: React.FC<ListItemProps> = ({ data, setDataSelected ,toggleFn = () => {} }) => {

    return (
      <TouchableOpacity
        style={{
          elevation: 1,
          shadowColor: 'black',

          shadowRadius: 8,
          shadowOpacity: 0.1,

        }}

        className="h-[100px] w-full bg-white rounded-lg flex-row   px-3"
        onPress={() => {
          // toggleFn();
          // setTimeout(() => {
          //   setDataSelected(data);
          // }, 300);
        }}>

        <Image
          className="rounded-full aspect-square h-[70px] w-[70px] bg-red-200 self-center mr-4  "
          source={data ? { uri: data?.picture?.medium } : require('@/presentation/ui/assets/images/no-user.png')}
        />

        <View className=" flex-col py-4  w-full shrink justify-between "  >
          <Text numberOfLines={2} className=" font-karla700Bold text-lg text-neutral-300 leading-[20px] " >{data?.name?.first} {data?.name?.last}</Text>

          <View className=" flex-row  justify-between w-full " >
            <Text numberOfLines={2} className="font-karla500Medium text-sm text-neutral-300  capitalize" >
              {convertGender(data?.gender)}</Text>
            <Text numberOfLines={2} className="font-karla500Medium text-sm text-neutral-300" >{format(data?.dob?.date, 'dd/MM/yyyy')}</Text>

          </View>
        </View>

      </TouchableOpacity>

    )
  }

  export {ListItemStudents}