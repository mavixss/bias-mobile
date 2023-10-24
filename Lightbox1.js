import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;

    return (
      <View style={{ paddingTop: 18 }}>
        <Animatable.Text
          animation={isFocused ? 'slideOutUp' : 'slideInDown'}
          style={{
            position: 'absolute',
            left: 10,
            top: isFocused ? 0 : 18,
            fontSize: isFocused ? 14 : 18,
            color: isFocused ? '#333' : '#aaa',
          }}
        >
          {label}
        </Animatable.Text>
        <TextInput
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={{
            fontSize: 18,
            color: '#333',
            borderBottomWidth: 1,
            borderBottomColor: '#aaa',
            paddingBottom: 5,
          }}
        />
      </View>
    );
  }
}

export default FloatingLabelInput;
