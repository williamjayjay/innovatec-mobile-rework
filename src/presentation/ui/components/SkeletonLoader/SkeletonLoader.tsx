import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import MySkeletonLoader from "./components/skeletonLoader.index"; 

export const MultipleSkeletonLoaders = () => {
    const contactsPlaceholderList = useMemo(() => {
        return Array.from({ length: 10 }).map((_, index) => <MySkeletonLoader key={index} />);
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 15 }}>
            {contactsPlaceholderList}
        </ScrollView>
    );
};
