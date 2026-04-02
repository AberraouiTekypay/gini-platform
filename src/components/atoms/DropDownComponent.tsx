import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

interface DataItem {
  label: string;
  value: string;
}

const renderRow = (item: DataItem) => (
  <View style={styles.item}>
    <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>{item.label}</Text>
    <View className={'w-full h-[1px] bg-[#ccc] self-center mt-3'} />
  </View>
);

interface DropDownComponentProps {
  title: string;
  isTitleWhite?: boolean;
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({title, isTitleWhite=false}) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text className={'font-bold my-2'} style={{color: isTitleWhite ? 'white' : 'black'}}>{title}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={renderRow}
        flatListProps={{ keyboardShouldPersistTaps: 'always' }}
      />
    </View>
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    height: 64,
    backgroundColor: '#dbdbdb',
    paddingHorizontal: 8,
    color: 'red',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    paddingHorizontal: 4,
    height: 45
  }
});
