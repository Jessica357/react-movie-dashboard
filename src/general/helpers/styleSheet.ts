import CSS from 'csstype';

export default interface StyleSheet {
  [key: string]: CSS.Properties;
}
