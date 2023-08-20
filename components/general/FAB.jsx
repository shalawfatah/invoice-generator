import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

export default class FabComponent extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <FAB.Group
        open={this.state.open}
        icon={this.state.open ? 'today' : 'plus'}
        actions={[
          { icon: 'plus', onPress: () => console.log('Pressed add') },
          {
            icon: 'star',
            label: 'Star',
            onPress: () => console.log('Pressed star'),
          },
          {
            icon: 'email',
            label: 'Email',
            onPress: () => console.log('Pressed email'),
          },
          {
            icon: 'alert',
            label: 'Remind',
            onPress: () => console.log('Pressed notifications'),
          },
        ]}
        onStateChange={({ open }) => this.setState({ open })}
        onPress={() => {
          if (this.state.open) {
            // do something if the speed dial is open
          }
        }}
        theme={{ colors: { accent: 'blue' } }}
      />
    );
  }
}
