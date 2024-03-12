export interface HourlyWeather {
  DateTime: string
  EpochDateTime: number
  WeatherIcon: number
  IconPhrase: string
  HasPrecipitation: boolean
  PrecipitationType: string,
  PrecipitationIntensity: string,
  IsDaylight: boolean
  Temperature: Temperature
  PrecipitationProbability: number
  MobileLink: string
  Link: string
}

export interface Temperature {
  Value: number
  Unit: string
  UnitType: number
}
