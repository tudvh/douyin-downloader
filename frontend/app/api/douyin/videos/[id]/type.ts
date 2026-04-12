/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface DouyinVideoResponse {
  code: number
  router: string
  data: Data
}

interface Data {
  aweme_detail: Awemedetail
  log_pb: Logpb
  status_code: number
}

interface Logpb {
  impr_id: string
}

interface Awemedetail {
  activity_video_type: number
  anchors: null
  authentication_token: string
  author: Author
  author_mask_tag: number
  author_user_id: number
  aweme_control: Awemecontrol
  aweme_id: string
  aweme_listen_struct: Awemelistenstruct
  aweme_type: number
  aweme_type_tags: string
  boost_status: number
  can_cache_to_local: boolean
  caption: string
  cf_assets_type: number
  cf_recheck_ts: number
  challenge_position: null
  chapter_list: null
  collect_stat: number
  collection_corner_mark: number
  comment_gid: number
  comment_list: null
  comment_permission_info: Commentpermissioninfo
  commerce_config_data: null
  component_control: Componentcontrol
  component_info_v2: string
  cover_labels: null
  create_time: number
  danmaku_control: Danmakucontrol
  desc: string
  disable_relation_bar: number
  dislike_dimension_list: null
  dislike_dimension_list_v2: null
  distribute_circle: Distributecircle
  douplus_user_type: number
  douyin_pc_video_extra_seo: string
  duet_aggregate_in_music_tab: boolean
  duration: number
  ecom_comment_atmosphere_type: number
  enable_comment_sticker_rec: boolean
  enable_decorated_emoji: boolean
  ent_log_extra: Entlogextra
  entertainment_product_info: Entertainmentproductinfo
  entertainment_video_paid_way: Entertainmentvideopaidway
  entertainment_video_type: number
  fall_card_struct: Fallcardstruct
  feed_comment_config: Feedcommentconfig
  flash_mob_trends: number
  follow_shoot_clip_info: Followshootclipinfo
  friend_recommend_info: Friendrecommendinfo
  game_tag_info: Gametaginfo
  geofencing: any[]
  geofencing_regions: null
  group_id: string
  guide_scene_info: Guidesceneinfo
  horizontal_type: number
  hybrid_label: null
  image_album_music_info: Imagealbummusicinfo
  image_comment: Guidesceneinfo
  image_crop_ctrl: number
  image_infos: null
  image_list: null
  images: null
  img_bitrate: null
  impression_data: Impressiondata
  incentive_item_type: number
  interaction_stickers: null
  is_24_story: number
  is_25_story: number
  is_ads: boolean
  is_collects_selected: number
  is_duet_sing: boolean
  is_from_ad_auth: boolean
  is_image_beat: boolean
  is_life_item: boolean
  is_moment_history: number
  is_moment_story: number
  is_new_text_mode: number
  is_share_post: boolean
  is_story: number
  is_top: number
  is_use_music: boolean
  item_aigc_follow_shot: number
  item_title: string
  item_warn_notification: Itemwarnnotification
  label_top_text: null
  libfinsert_task_id: string
  long_video: null
  mark_largely_following: boolean
  media_type: number
  music: Music
  nickname_position: null
  origin_comment_ids: null
  origin_duet_resource_uri: string
  origin_text_extra: any[]
  original: number
  original_images: null
  packed_clips: null
  pc_need_login: boolean
  personal_page_botton_diagnose_style: number
  photo_search_entrance: Photosearchentrance
  play_progress: Playprogress
  position: null
  preview_title: string
  preview_video_status: number
  product_genre_info: Productgenreinfo
  promotions: any[]
  publish_plus_alienation: Publishplusalienation
  rate: number
  region: string
  related_music_anchor: Relatedmusicanchor
  relation_labels: null
  risk_infos: Riskinfos
  sec_item_id: string
  select_anchor_expanded_content: number
  seo_info: Guidesceneinfo
  series_basic_info: Guidesceneinfo
  series_paid_info: Seriespaidinfo
  share_info: Shareinfo2
  share_rec_extra: string
  share_url: string
  shoot_way: string
  should_open_ad_report: boolean
  show_follow_button: Guidesceneinfo
  social_tag_list: null
  statistics: Statistics
  status: Status
  text_extra: Textextra[]
  trends_event_track: string
  uniqid_position: null
  user_digged: number
  user_recommend_status: number
  video: Video
  video_control: Videocontrol
  video_game_data_channel_config: Guidesceneinfo
  video_labels: null
  video_share_edit_status: number
  video_tag: Videotag[]
  video_text: any[]
  visual_search_info: Visualsearchinfo
  xigua_base_info: Xiguabaseinfo
}

interface Xiguabaseinfo {
  item_id: number
  star_altar_order_id: number
  star_altar_type: number
  status: number
}

interface Visualsearchinfo {
  is_ecom_img: boolean
  is_high_accuracy_ecom: boolean
  is_high_recall_ecom: boolean
  is_show_img_entrance: boolean
}

interface Videotag {
  level: number
  tag_id: number
  tag_name: string
}

interface Videocontrol {
  allow_douplus: boolean
  allow_download: boolean
  allow_duet: boolean
  allow_dynamic_wallpaper: boolean
  allow_music: boolean
  allow_react: boolean
  allow_record: boolean
  allow_share: boolean
  allow_stitch: boolean
  disable_record_reason: string
  download_ignore_visibility: boolean
  download_info: Downloadinfo
  draft_progress_bar: number
  duet_ignore_visibility: boolean
  duet_info: Downloadinfo
  prevent_download_type: number
  share_grayed: boolean
  share_ignore_visibility: boolean
  share_type: number
  show_progress_bar: number
  timer_info: Guidesceneinfo
  timer_status: number
}

interface Downloadinfo {
  level: number
}

interface Video {
  audio: Guidesceneinfo
  big_thumbs: Bigthumb[]
  bit_rate: Bitrate[]
  bit_rate_audio: null
  cdn_url_expired: number
  cover: Avatarthumb
  cover_original_scale: Avatarthumb
  download_addr: Downloadaddr
  duration: number
  dynamic_cover: Avatarthumb
  format: string
  gaussian_cover: Avatarthumb
  has_watermark: boolean
  height: number
  horizontal_type: number
  is_h265: number
  is_source_HDR: number
  meta: string
  origin_cover: Avatarthumb
  play_addr: Playaddr
  play_addr_265: Playaddr
  play_addr_h264: Playaddr
  ratio: string
  video_model: string
  width: number
}

interface Downloadaddr {
  data_size: number
  file_cs: string
  height: number
  uri: string
  url_list: string[]
  width: number
}

interface Bitrate {
  FPS: number
  HDR_bit: string
  HDR_type: string
  bit_rate: number
  format: string
  gear_name: string
  is_bytevc1: number
  is_h265: number
  play_addr: Playaddr
  quality_type: number
  video_extra: string
}

interface Playaddr {
  data_size: number
  file_cs: string
  file_hash: string
  height: number
  uri: string
  url_key: string
  url_list: string[]
  width: number
}

interface Bigthumb {
  duration: number
  fext: string
  img_num: number
  img_url: string
  img_urls: string[]
  img_x_len: number
  img_x_size: number
  img_y_len: number
  img_y_size: number
  interval: number
  uri: string
  uris: string[]
}

interface Textextra {
  caption_end: number
  caption_start: number
  end: number
  hashtag_id: string
  hashtag_name: string
  is_commerce: boolean
  start: number
  type: number
}

interface Status {
  allow_friend_recommend: boolean
  allow_friend_recommend_guide: boolean
  allow_self_recommend_to_friend: boolean
  allow_share: boolean
  aweme_id: string
  enable_soft_delete: number
  in_reviewing: boolean
  is_delete: boolean
  is_prohibited: boolean
  listen_video_status: number
  not_allow_soft_del_reason: string
  part_see: number
  private_status: number
  review_result: Reviewresult
}

interface Reviewresult {
  review_status: number
}

interface Statistics {
  admire_count: number
  aweme_id: string
  collect_count: number
  comment_count: number
  digg_count: number
  play_count: number
  recommend_count: number
  share_count: number
}

interface Shareinfo2 {
  share_desc: string
  share_desc_info: string
  share_link_desc: string
  share_url: string
}

interface Seriespaidinfo {
  item_price: number
  series_paid_status: number
}

interface Riskinfos {
  content: string
  risk_sink: boolean
  type: number
  vote: boolean
  warn: boolean
}

interface Relatedmusicanchor {
  extra: string
  image_url: Imageurl
  priority: number
  schema_url: string
  type: string
}

interface Imageurl {
  uri: string
  url_list: string[]
}

interface Publishplusalienation {
  alienation_type: number
}

interface Productgenreinfo {
  material_genre_sub_type_set: number[]
  product_genre_type: number
  special_info: Specialinfo
}

interface Specialinfo {
  recommend_group_name: number
}

interface Playprogress {
  last_modified_time: number
  play_progress: number
}

interface Photosearchentrance {
  ecom_type: number
}

interface Music {
  album: string
  artist_user_infos: null
  artists: any[]
  audition_duration: number
  author: string
  author_deleted: boolean
  author_position: null
  author_status: number
  avatar_large: Avatarthumb
  avatar_medium: Avatarthumb
  avatar_thumb: Avatarthumb
  binded_challenge_id: number
  can_background_play: boolean
  collect_stat: number
  cover_hd: Avatarthumb
  cover_large: Avatarthumb
  cover_medium: Avatarthumb
  cover_thumb: Avatarthumb
  dmv_auto_show: boolean
  dsp_status: number
  duration: number
  end_time: number
  external_song_info: any[]
  extra: string
  id: number
  id_str: string
  is_audio_url_with_cookie: boolean
  is_commerce_music: boolean
  is_del_video: boolean
  is_matched_metadata: boolean
  is_original: boolean
  is_original_sound: boolean
  is_pgc: boolean
  is_restricted: boolean
  is_video_self_see: boolean
  lyric_short_position: null
  mid: string
  music_chart_ranks: null
  music_collect_count: number
  music_cover_atmosphere_color_value: string
  music_status: number
  musician_user_infos: null
  mute_share: boolean
  offline_desc: string
  owner_handle: string
  owner_id: string
  owner_nickname: string
  pgc_music_type: number
  play_url: Playurl
  position: null
  prevent_download: boolean
  prevent_item_download_status: number
  preview_end_time: number
  preview_start_time: number
  reason_type: number
  redirect: boolean
  schema_url: string
  search_impr: Searchimpr
  sec_uid: string
  shoot_duration: number
  show_origin_clip: boolean
  source_platform: number
  start_time: number
  status: number
  strong_beat_url: Avatarthumb
  tag_list: null
  title: string
  unshelve_countries: null
  user_count: number
  video_duration: number
}

interface Searchimpr {
  entity_id: string
}

interface Playurl {
  height: number
  uri: string
  url_key: string
  url_list: string[]
  width: number
}

interface Itemwarnnotification {
  content: string
  show: boolean
  type: number
}

interface Impressiondata {
  group_id_list_a: any[]
  group_id_list_b: any[]
  group_id_list_c: any[]
  group_id_list_d: any[]
  similar_id_list_a: number[]
  similar_id_list_b: null
}

interface Imagealbummusicinfo {
  begin_time: number
  end_time: number
  volume: number
}

interface Guidesceneinfo {}

interface Gametaginfo {
  is_game: boolean
}

interface Friendrecommendinfo {
  disable_friend_recommend_guide_label: boolean
  friend_recommend_source: number
}

interface Followshootclipinfo {
  clip_from_platform: number
  clip_from_user: number
  clip_video_all: number
  origin_clip_id: number
}

interface Feedcommentconfig {
  audio_comment_permission: number
  author_audit_status: number
  common_flags: string
  input_config_text: string
}

interface Fallcardstruct {
  recommend_reason_v2: string
}

interface Entertainmentvideopaidway {
  enable_use_new_ent_data: boolean
  paid_type: number
  paid_ways: any[]
}

interface Entertainmentproductinfo {
  market_info: Marketinfo
}

interface Marketinfo {
  limit_free: Limitfree
}

interface Limitfree {
  in_free: boolean
}

interface Entlogextra {
  log_extra: string
}

interface Distributecircle {
  campus_block_interaction: boolean
  distribute_type: number
  is_campus: boolean
}

interface Danmakucontrol {
  activities: Activity[]
  danmaku_cnt: number
  enable_danmaku: boolean
  first_danmaku_offset: number
  is_post_denied: boolean
  last_danmaku_offset: number
  pass_through_params: string
  post_denied_reason: string
  post_privilege_level: number
  skip_danmaku: boolean
  smart_mode_decision: number
}

interface Activity {
  id: number
  type: number
}

interface Componentcontrol {
  data_source_url: string
}

interface Commentpermissioninfo {
  can_comment: boolean
  comment_permission_status: number
  item_detail_entry: boolean
  press_entry: boolean
  toast_guide: boolean
}

interface Awemelistenstruct {
  trace_info: string
}

interface Awemecontrol {
  can_comment: boolean
  can_forward: boolean
  can_share: boolean
  can_show_comment: boolean
}

interface Author {
  avatar_thumb: Avatarthumb
  awemehts_greet_info: string
  cf_list: null
  close_friend_type: number
  contacts_status: number
  contrail_list: null
  cover_url: Avatarthumb[]
  create_time: number
  custom_verify: string
  data_label_list: null
  endorsement_info_list: null
  enterprise_verify_reason: string
  favoriting_count: number
  follow_status: number
  follower_count: number
  follower_list_secondary_information_struct: null
  follower_status: number
  following_count: number
  im_role_ids: null
  is_ad_fake: boolean
  is_blocked_v2: boolean
  is_blocking_v2: boolean
  is_cf: number
  live_high_value: number
  mate_add_permission: number
  max_follower_count: number
  nickname: string
  offline_info_list: null
  personal_tag_list: null
  prevent_download: boolean
  risk_notice_text: string
  sec_uid: string
  secret: number
  share_info: Shareinfo
  short_id: string
  signature: string
  signature_extra: null
  special_follow_status: number
  special_people_labels: null
  status: number
  story25_comment: number
  story_interactive: number
  story_ttl: number
  text_extra: null
  total_favorited: number
  uid: string
  unique_id: string
  user_age: number
  user_canceled: boolean
  user_permissions: null
  verification_type: number
}

interface Shareinfo {
  share_desc: string
  share_desc_info: string
  share_qrcode_url: Avatarthumb
  share_title: string
  share_title_myself: string
  share_title_other: string
  share_url: string
  share_weibo_desc: string
}

interface Avatarthumb {
  height: number
  uri: string
  url_list: string[]
  width: number
}
