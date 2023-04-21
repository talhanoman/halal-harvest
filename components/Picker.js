import { View } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { fontWeight400 } from '../assets/Styles/FontWeights';
export default function Picker({ selectedItem, setSelectedItem, items, label }) {
    return (
        <>
            <Text style={fontWeight400} className="text-gray-800">{label}</Text>
            <View className="                           
                            form-control
                            block                                                        
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            w-full
                            rounded">
                <Picker
                    selectedValue={selectedItem}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedItem(itemValue)
                    }>
                    {
                        items.map(({ label, value }) =>
                            <Picker.Item label={label} value={value} />
                        )
                    }
                </Picker>
            </View>
        </>
    )
}