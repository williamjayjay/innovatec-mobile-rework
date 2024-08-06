import React from 'react';
import { View, useWindowDimensions } from "react-native";
import { Circle, Rect } from "react-native-svg";
import ContentLoader from "react-content-loader/native";

const MySkeletonLoader = () => {
    const { width: widthDevice } = useWindowDimensions();

    return (
        <ContentLoader
            viewBox={`0 0 ${widthDevice} 100`}
            backgroundColor="#E5E5E5"
            foregroundColor="#C5C5C5"
            height={120}
            width={widthDevice}
        >
            {/* Ícone */}
            <Circle cx="48" cy="50" r="35" />

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 15 }}>
                {/* Nome do aluno */}
                <Rect x="100" y="20" rx="6" ry="6" width="215" height="20" />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* Respectivamente, sexo e data de nascimento */}
                    <Rect x="100" y="65" rx="6" ry="6" width="80" height="15" />
                    <Rect x="235" y="65" rx="6" ry="6" width="80" height="15" />
                </View>
            </View>
        </ContentLoader>
    );
};

export default React.memo(MySkeletonLoader);
