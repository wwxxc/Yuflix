import { View, Text, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { Link } from 'expo-router'

const CardPerson = ( {Data}: {Data : Movie[]} ) => {
    const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row gap-1">
        {Data.map((data, index) => (
            <Link
                className="h-[170px] w-[115px] rounded-md mb-3"
                href={`/movies/detail/${data.id}`}
                key={index}
            >
            <Image
                key={index}
                className="h-[170px] w-[115px] rounded-md mb-3"
                placeholder={{ blurhash }}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                }}
            />
            </Link>
        ))}
        </View>
    </ScrollView>
    ); 
}

export default CardPerson