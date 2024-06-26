import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { api } from "@/utils/api";
import CardMovies from "@/components/card/CardMovies";
import CardPeople from "@/components/card/CardPeople";
import SkeletonCardHome from "@/components/skeleton/Skeleton";
import SkeletonCardPeople from "@/components/skeleton/SkeletonPeople";

const MoviesPage = () => {
    const [isLoadedPeople, setIsLoadedPeople] = useState(true);
    const [isLoadedTrending, setIsLoadedTrending] = useState(true);
    const [isLoadedTopRated, setIsLoadedTopRated] = useState(true);
    const [isLoadedUpcoming, setIsLoadedUpcoming] = useState(true);
    
    const [People, setPeople] = useState([]);
    const [Trending, setTrending] = useState([]);
    const [TopRated, setTopRated] = useState([]);
    const [Upcoming, setUpcoming] = useState([]);

    const apiKey = process.env.EXPO_PUBLIC_TMBD_API_KEY;

    useEffect(() => {
        const fetchData = async (url: string, setData: any, setIsLoaded: any) => {
            try {
            const response = await fetch(url);
            const data = await response.json();
            setData(data.results);
            setIsLoaded(false);
            } catch (error) {
            console.error(error);
            setIsLoaded(false);
        }};
    
        if (apiKey) {
            fetchData(`${api}/trending/person/day?api_key=${apiKey}`, setPeople, setIsLoadedPeople);
            fetchData(`${api}/trending/movie/day?api_key=${apiKey}`, setTrending, setIsLoadedTrending);
            fetchData(`${api}/movie/top_rated?api_key=${apiKey}`, setTopRated, setIsLoadedTopRated);
            fetchData(`${api}/movie/upcoming?api_key=${apiKey}`, setUpcoming, setIsLoadedUpcoming);
        }
    }, [apiKey]);

    if (!apiKey) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>API key is missing. Please provide a valid API key in .env</Text>
            </View>
        );
    }

    return (
        <>
            <Text style={styles.titlePoster}>Top Cast</Text>
            {isLoadedPeople ? (
                <SkeletonCardPeople />
            ) : (
                <CardPeople Poeple={People} />
            )}

            <Text style={styles.titlePoster}>Trending Today</Text>
            {isLoadedTrending ? (
                <SkeletonCardHome />
            ) : (
                <CardMovies Data={Trending} isTrending={true} />
            )}

            <Text style={styles.titlePoster}>Top Rated</Text>
            {isLoadedTopRated ? (
                <SkeletonCardHome />
            ) : (
                <CardMovies Data={TopRated} isTrending={false} />
            )}

            <Text style={styles.titlePoster}>Upcoming</Text>
            {isLoadedUpcoming ? (
                <SkeletonCardHome />
            ) : (
                <CardMovies Data={Upcoming} isTrending={false} />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    poster: {
        height: "100%",
        width: "100%",
        position: "absolute",
    },
    titlePoster: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 17,
        marginBottom: 5
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
    },
});

export default MoviesPage;
