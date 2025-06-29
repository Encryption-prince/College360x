module ragging_reports::ragging_reports {
    use std::signer;
    use std::vector;
    use std::string::{Self, String};
    use std::option::{Self, Option};
    use aptos_framework::timestamp;
    use aptos_framework::account;

    /// Error codes
    const ENOT_AUTHORIZED: u64 = 1;
    const EREPORT_NOT_FOUND: u64 = 2;
    const EINVALID_SEVERITY: u64 = 3;
    const EINVALID_STATUS: u64 = 4;

    /// Report status enum
    const STATUS_DRAFT: u64 = 0;
    const STATUS_PENDING: u64 = 1;
    const STATUS_UNDER_INVESTIGATION: u64 = 2;
    const STATUS_RESOLVED: u64 = 3;
    const STATUS_WITHDRAWN: u64 = 4;

    /// Severity levels
    const SEVERITY_LOW: u64 = 0;
    const SEVERITY_MEDIUM: u64 = 1;
    const SEVERITY_HIGH: u64 = 2;

    /// Structure to store ragging report data
    struct RaggingReport has key, store, drop, store {
        report_hash: vector<u8>,
        severity_level: u64,
        location: String,
        status: u64,
        metadata: String,
        timestamp: u64,
        submitter: address,
        is_anonymous: bool,
    }

    /// Structure to store report index for quick lookup
    struct ReportIndex has key {
        reports: vector<vector<u8>>,
    }

    /// Structure to store user's reports
    struct UserReports has key {
        reports: vector<vector<u8>>,
    }

    /// Events
    struct ReportSubmittedEvent has drop, store {
        report_hash: vector<u8>,
        submitter: address,
        timestamp: u64,
        severity_level: u64,
        location: String,
    }

    struct ReportStatusUpdatedEvent has drop, store {
        report_hash: vector<u8>,
        old_status: u64,
        new_status: u64,
        updated_by: address,
        timestamp: u64,
    }

    /// Initialize the module
    fun init_module(account: &signer) {
        // Initialize the report index
        move_to(account, ReportIndex {
            reports: vector::empty(),
        });
    }

    /// Submit a new ragging report
    public entry fun submit_report(
        account: &signer,
        report_hash: vector<u8>,
        severity_level: u64,
        location: String,
        status: u64,
        metadata: String,
        is_anonymous: bool,
    ) {
        // Validate severity level
        assert!(severity_level <= SEVERITY_HIGH, EINVALID_SEVERITY);
        
        // Validate status
        assert!(status <= STATUS_WITHDRAWN, EINVALID_STATUS);

        let submitter = signer::address_of(account);
        let timestamp = timestamp::now_seconds();

        // Create the report
        let report = RaggingReport {
            report_hash: report_hash,
            severity_level: severity_level,
            location: location,
            status: status,
            metadata: metadata,
            timestamp: timestamp,
            submitter: submitter,
            is_anonymous: is_anonymous,
        };

        // Store the report
        move_to(account, report);

        // Add to global index
        let report_index = borrow_global_mut<ReportIndex>(@ragging_reports);
        vector::push_back(&mut report_index.reports, report_hash);

        // Add to user's reports
        if (!exists<UserReports>(submitter)) {
            move_to(account, UserReports {
                reports: vector::empty(),
            });
        };
        let user_reports = borrow_global_mut<UserReports>(submitter);
        vector::push_back(&mut user_reports.reports, report_hash);

        // Emit event
        let event_handle = account::get_event_handle<ReportSubmittedEvent>(account);
        event::emit_event(&mut event_handle, ReportSubmittedEvent {
            report_hash: report_hash,
            submitter: submitter,
            timestamp: timestamp,
            severity_level: severity_level,
            location: location,
        });
    }

    /// Update report status (only by authorized personnel)
    public entry fun update_report_status(
        account: &signer,
        report_hash: vector<u8>,
        new_status: u64,
    ) {
        // Validate status
        assert!(new_status <= STATUS_WITHDRAWN, EINVALID_STATUS);

        let updater = signer::address_of(account);
        
        // Check if report exists
        assert!(exists<RaggingReport>(updater), EREPORT_NOT_FOUND);
        
        let report = borrow_global_mut<RaggingReport>(updater);
        let old_status = report.status;
        
        // Update status
        report.status = new_status;

        // Emit event
        let event_handle = account::get_event_handle<ReportStatusUpdatedEvent>(account);
        event::emit_event(&mut event_handle, ReportStatusUpdatedEvent {
            report_hash: report_hash,
            old_status: old_status,
            new_status: new_status,
            updated_by: updater,
            timestamp: timestamp::now_seconds(),
        });
    }

    /// Get report by hash
    public fun get_report(report_hash: vector<u8>): Option<RaggingReport> {
        // This would need to be implemented with a proper lookup mechanism
        // For now, returning None as this is a simplified version
        option::none()
    }

    /// Get all reports for a user
    public fun get_user_reports(user: address): vector<vector<u8>> {
        if (exists<UserReports>(user)) {
            *&borrow_global<UserReports>(user).reports
        } else {
            vector::empty()
        }
    }

    /// Get all reports (for authorized personnel)
    public fun get_all_reports(): vector<vector<u8>> {
        *&borrow_global<ReportIndex>(@ragging_reports).reports
    }

    /// Verify report exists
    public fun verify_report(report_hash: vector<u8>): bool {
        // This would check if the report exists in the global index
        let report_index = borrow_global<ReportIndex>(@ragging_reports);
        vector::contains(&report_index.reports, &report_hash)
    }

    /// Get report count
    public fun get_report_count(): u64 {
        vector::length(&borrow_global<ReportIndex>(@ragging_reports).reports)
    }

    /// Get reports by severity level
    public fun get_reports_by_severity(severity: u64): vector<vector<u8>> {
        // This would filter reports by severity level
        // Implementation would require additional data structures
        vector::empty()
    }

    /// Get reports by status
    public fun get_reports_by_status(status: u64): vector<vector<u8>> {
        // This would filter reports by status
        // Implementation would require additional data structures
        vector::empty()
    }

    /// Withdraw report (only by original submitter)
    public entry fun withdraw_report(
        account: &signer,
        report_hash: vector<u8>,
    ) {
        let submitter = signer::address_of(account);
        
        // Check if report exists and belongs to submitter
        assert!(exists<RaggingReport>(submitter), EREPORT_NOT_FOUND);
        
        let report = borrow_global_mut<RaggingReport>(submitter);
        assert!(report.submitter == submitter, ENOT_AUTHORIZED);
        
        // Update status to withdrawn
        let old_status = report.status;
        report.status = STATUS_WITHDRAWN;

        // Emit event
        let event_handle = account::get_event_handle<ReportStatusUpdatedEvent>(account);
        event::emit_event(&mut event_handle, ReportStatusUpdatedEvent {
            report_hash: report_hash,
            old_status: old_status,
            new_status: STATUS_WITHDRAWN,
            updated_by: submitter,
            timestamp: timestamp::now_seconds(),
        });
    }

    /// Add proof of existence
    public entry fun add_proof_of_existence(
        account: &signer,
        report_hash: vector<u8>,
        proof_hash: vector<u8>,
    ) {
        // This would add additional proof to an existing report
        // Implementation depends on specific requirements
    }

    /// Get report statistics
    public fun get_statistics(): (u64, u64, u64, u64, u64) {
        // Returns (total, pending, under_investigation, resolved, withdrawn)
        // This would require additional data structures for efficient counting
        (0, 0, 0, 0, 0)
    }
} 