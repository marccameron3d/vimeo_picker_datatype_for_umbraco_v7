The Vimeo Picker datatype for Umbraco v7.
 
Usage
=====

Use property value converter to view in razor e.g.

<iframe src="//player.vimeo.com/video/@@Model.Content.GetPropertyValue<ourUmbraco.VimeoPicker.PropertyValueConverters.VimeoPicker>("yourAlias").VideoId" width="557" height="313" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>

<img src="@Model.Content.GetPropertyValue<ourUmbraco.VimeoPicker.PropertyValueConverters.VimeoPicker>("yourAlias").ThumbnailSmall" />
 
