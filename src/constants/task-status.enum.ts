/**
 * TaskStatus
 *
 * Các trạng thái khác nhau của một task.
 */
export enum TaskStatus {
  /**
   * Trạng thái khi task đang mở và chưa được thực hiện.
   */
  OPEN_STATUS = 'Open',

  /**
   * Trạng thái khi task đang được tiến hành.
   */
  IN_PROGRESS_STATUS = 'In Progress',

  /**
   * Trạng thái khi task đã hoàn thành.
   */
  DONE_STATUS = 'Done',

  /**
   * Trạng thái khi task đã bị đóng lại.
   */
  CLOSED_STATUS = 'Closed',

  /**
   * Trạng thái khi task đang chờ xử lý.
   */
  PENDING_STATUS = 'Pending',

  /**
   * Trạng thái khi task đang được xem xét hoặc đánh giá.
   */
  REVIEWING_STATUS = 'Reviewing',
}
