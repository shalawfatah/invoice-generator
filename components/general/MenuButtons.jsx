import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const MenuButtons = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const navigation = useNavigation();

  const { open } = state;

  return (
    <PaperProvider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'file-document-edit',
              label: 'Invoice',
              onPress: () => navigation.navigate('Add Invoice'),
            },
            {
              icon: 'file-document-edit-outline',
              label: 'Estimate',
              onPress: () => navigation.navigate('Add Estimate'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </PaperProvider>
  );
};

export default MenuButtons;